import React from "react";
import {auth} from "@clerk/nextjs/server";
import Link from "next/link";

import {CreateWorkout} from "@/components/routines/create-workout";
import {getRoutines} from "@/queries/routines";
import {DropdownWorkout} from "@/components/routines/dropdown-workout";

export const dynamic = "force-dynamic";

export default async function RoutinesPage() {
  const user = auth();

  if (user.userId === null) return <>You need to be logged in to view this page</>;
  const {routines, error} = await getRoutines(user.userId);

  return (
    <section className="mt-8 flex flex-col gap-8">
      <section className="flex max-w-[375px] items-center justify-center lg:justify-start">
        <CreateWorkout isEdit={false} />
      </section>
      <section className="flex flex-col gap-5">
        <h3>Routines</h3>
        <section className="grid grid-cols-auto-fill-minmax gap-5 ">
          {routines?.length === 0 && (
            <section className="text-center">
              <p>No routines found</p>
            </section>
          )}
          {routines?.map((routine) => {
            return (
              <section key={routine.id} className="flex items-center justify-between rounded-lg ">
                <Link
                  className="flex w-full items-center justify-between rounded-lg rounded-r-none border border-r-0 p-4 "
                  href={`/routines/${routine.id}`}
                >
                  {/* <Link href={`/routines/${routine.id}`}> */}
                  <section>
                    <p>{routine.name}</p>
                  </section>
                  {/* </Link> */}
                </Link>
                <section className="flex h-full items-center rounded-lg rounded-l-none border border-l-0 p-4">
                  <section className="flex h-full items-center">
                    <DropdownWorkout routine={routine} />
                  </section>
                </section>
              </section>
            );
          })}
        </section>
      </section>
    </section>
  );
}
