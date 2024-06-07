import {AtSign, Mail} from "lucide-react";
import {auth} from "@clerk/nextjs/server";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getClient} from "@/queries/clients";
import {CurrentRoutine} from "@/components/clients/current-routine";
import {getInitials} from "@/lib/get-initials";
import {getWorkouts} from "@/queries/workout";
import {ChooseWorkout} from "@/components/clients/choose-workout";
import {clientHasRoutine, userRoutine} from "@/queries/user-routines";
import {ClientCurrentRoutine} from "@/components/clients/client-current-routine";
import {DropdownWorkout} from "@/components/default-dropdown";
import {DeleteCurrentRoutine} from "@/components/clients/delete-current-routine";

export default async function ClientPage({params}: {params: {id: string}}) {
  const {id} = params;
  const user = auth();
  const coachId = user?.userId ?? "";
  const {client} = await getClient(id);
  const {workouts} = await getWorkouts(coachId);

  const {data} = await clientHasRoutine(id, coachId);

  const routineId = data?.routine_id ?? "";
  const userRoutineId = data?.id ?? "";

  const {routine} = await userRoutine(routineId, coachId);

  return (
    <section className="flex flex-col gap-4 py-4 ">
      <section className="flex items-center gap-4">
        <Avatar className="h-28 w-28">
          <AvatarImage src={client?.image} />
          <AvatarFallback>{getInitials(client?.name ?? "")}</AvatarFallback>
        </Avatar>
        <section className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold">{client?.name}</h3>
          <p className="flex items-center gap-1 text-gray-500">
            {" "}
            <Mail className="h-4 w-4" />
            {client?.email}
          </p>
          <p className="flex items-center gap-1 text-gray-500">
            {" "}
            <AtSign className="h-4 w-4" />
            {client?.username}
          </p>
        </section>
      </section>
      <section className=" flex flex-col gap-4 py-4 md:grid md:grid-cols-auto-fill-minmax">
        <section className="flex flex-col  border-b border-l border-r">
          <section className="flex items-center justify-between border p-4">
            <p>Current Split</p>
            <DropdownWorkout>
              <DeleteCurrentRoutine
                clientId={id}
                disabled={data === null}
                routineId={userRoutineId}
                user_id={coachId}
              />
            </DropdownWorkout>
          </section>
          <section className="flex items-center justify-center p-4">
            {data === null ? (
              <CurrentRoutine
                className="w-[250px] bg-blue-400 text-white"
                title="Add new routine"
                variant="primary"
              >
                <ChooseWorkout clientId={id} coachId={coachId} workouts={workouts} />
              </CurrentRoutine>
            ) : (
              <CurrentRoutine title={routine?.name ?? "Routine"} variant="primary">
                <ClientCurrentRoutine routine={routine} />
              </CurrentRoutine>
            )}
          </section>
        </section>
        <CardInfo title="Weight">
          <p className="text-lg font-medium text-blue-400">
            {client?.weight === null ? 0 : client?.weight} {client?.weight_metric}
          </p>
        </CardInfo>
        <CardInfo title="Height">
          <p className="text-lg font-medium text-blue-400">
            {client?.height === null ? 0 : client?.height}
          </p>
        </CardInfo>
        <CardInfo title="Workout days">
          <p className="text-lg font-medium text-blue-400">
            {client?.workout_days === null ? 0 : client?.workout_days}
          </p>
        </CardInfo>
      </section>
    </section>
  );
}

export function CardInfo({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className="flex h-[131px] flex-col items-center justify-center gap-3 border p-2">
      <p className="text-xl font-medium">{title}</p>
      <p className="text-lg font-medium text-blue-400">{children}</p>
    </section>
  );
}
