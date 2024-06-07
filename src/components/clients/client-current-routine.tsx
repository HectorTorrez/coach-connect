"use client";

import {Workout} from "@/types/workout";

interface ClientCurrentRoutineProps {
  routine: Workout | null;
}

export function ClientCurrentRoutine({routine}: ClientCurrentRoutineProps) {
  return (
    <>
      {routine?.coach_templates.map((template) => (
        <section key={template.id}>
          <p>{template.name}</p>
          {template.coach_exercise.map((exercise) => (
            <section key={exercise.id}>
              {exercise.coach_sets.map((set) => (
                <section key={set.id}>
                  <p>
                    {set.set} x {exercise.name}
                  </p>
                </section>
              ))}
            </section>
          ))}
        </section>
      ))}
    </>
  );
}
