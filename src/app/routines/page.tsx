import React from "react";

import {DialogCreateRoutine} from "@/components/routines/create-routine";

export default function RoutinesPage() {
  return (
    <section className="mt-8 flex flex-col gap-8">
      <section>
        <DialogCreateRoutine isEditing={false} />
      </section>
      <section>
        <h3>Routines</h3>
      </section>
    </section>
  );
}
