import {auth} from "@clerk/nextjs/server";

import {getWorkout} from "@/queries/workout";
import {DialogCreateRoutine} from "@/components/routines/create-routine";

export default async function RoutinePage({params}: {params: {id: string}}) {
  const user = auth();
  const id = params.id;

  const {workout, error} = await getWorkout(id, user.userId ?? "");

  return (
    <section className="mt-5 flex flex-col gap-10">
      <section className="flex items-center justify-between font-bold">
        <h3 className="text-4xl">{workout?.name}</h3>
        <DialogCreateRoutine isEditing={false} workoutId={id} />
      </section>
      <section>
        <p className="text-2xl">Routines</p>
      </section>
    </section>
  );
}
