"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/components/ui/use-toast";
import {insertNote} from "@/queries/notes";

const FormSchema = z.object({
  note: z
    .string()
    .min(10, {
      message: "Note must be at least 10 characters.",
    })
    .max(160, {
      message: "Note must not be longer than 30 characters.",
    }),
  type: z.enum(["workout", "meal"]),
});

export function Note({client_id}: {client_id: string}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {user} = useUser();
  const coachId = user?.id ?? "";
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const {data: workout, error} = await insertNote(data.note, data.type, coachId, client_id);

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
    if (workout !== null) {
      toast({
        title: "Note Added",
        description: "Note has been added successfully",
        variant: "success",
      });
      router.refresh();
      form.reset({
        note: "",
      });
    }
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="meal">Meal</SelectItem>
                  <SelectItem value="workout">Workout</SelectItem>
                </SelectContent>
              </Select>

              {form.formState.errors.type ? <FormMessage /> : null}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({field}) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea className="resize-none" placeholder="Enter a note..." {...field} />
              </FormControl>

              {form.formState.errors.note ? <FormMessage /> : null}
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
