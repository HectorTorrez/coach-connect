import {auth} from "@clerk/nextjs/server";

import {getWorkout} from "@/queries/workout";
import {DialogCreateRoutine} from "@/components/routines/create-routine";
import {GetRoutines} from "@/queries/routines";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DropdownWorkout} from "@/components/routines/dropdown-workout";
import {DeleteRoutine} from "@/components/routines/delete-routine";

export default async function RoutinePage({params}: {params: {id: string}}) {
  const user = auth();
  const id = params.id;

  const {workout, error} = await getWorkout(id, user.userId ?? "");
  const {routines, error: routinesError} = await GetRoutines(user.userId ?? "", id);

  return (
    <section className="mt-5 flex flex-col gap-10">
      <section className="flex items-center justify-between font-bold">
        <h3 className="text-4xl">{workout?.name}</h3>
        <DialogCreateRoutine isEditing={false} workoutId={id} />
      </section>
      <section className="flex flex-col gap-5">
        <p className="text-2xl">Routines</p>
        <section className="grid grid-cols-auto-fill-minmax gap-5">
          {routines?.map((item) => (
            <>
              {item.coach_templates.map((template) => (
                <Dialog key={template.id}>
                  <DialogTrigger asChild>
                    <Button variant="outline">{template.name}</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DropdownWorkout>
                        <DialogDescription>
                          <DialogCreateRoutine
                            isEditing
                            isEditingExercises={template.coach_exercise}
                            isEditingTemplateName={template.name}
                            templateId={template.id}
                            workoutId={id}
                          />
                        </DialogDescription>
                        <DialogDescription>
                          <DeleteRoutine id={template.id} />
                        </DialogDescription>
                      </DropdownWorkout>
                      <DialogTitle>{template.name}</DialogTitle>
                    </DialogHeader>

                    <section>
                      {template.coach_exercise.map((exercise) => (
                        <section key={exercise.id}>
                          <p>
                            ({exercise.coach_sets.length}) x {exercise.name}
                          </p>
                          {/* <section>
                          {exercise.coach_sets.map((set) => (
                            <section key={set.id} className="flex gap-4">
                              <p className="flex flex-col  items-center">
                                Set <span>{set.set}</span>
                              </p>
                              <p className="flex flex-col  items-center">
                                Weight <span>{set.weight}</span>
                                </p>
                              <p className="flex flex-col items-center">
                                Reps <span>{set.reps}</span>
                              </p>
                            </section>
                          ))}
                        </section> */}
                        </section>
                      ))}
                    </section>
                  </DialogContent>
                </Dialog>
              ))}
            </>
          ))}
        </section>
      </section>
    </section>
  );
}
