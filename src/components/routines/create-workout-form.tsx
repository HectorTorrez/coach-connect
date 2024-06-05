import {useUser} from "@clerk/nextjs";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

import {Input} from "../ui/input";
import {toast} from "../ui/use-toast";
import {Button} from "../ui/button";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PostCreateWorkout, PutUpdateWorkout} from "@/queries/workout";

const formSchema = z.object({
  workoutName: z.string().min(2).max(20),
});

interface CreateWorkoutFormProps {
  setOpen: (open: boolean) => void;
  isEdit: boolean;
  workoutId?: string;
  name?: string;
}

export function CreateWorkoutForm({setOpen, isEdit, workoutId, name}: CreateWorkoutFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const {user} = useUser();

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const {workoutName} = values;

    if (user === null || user === undefined) {
      return toast({
        title: "Please login",
        variant: "destructive",
      });
    }

    const {workouts, error} = await PostCreateWorkout(workoutName, user.id);

    if (error) {
      return toast({
        title: error,
        variant: "destructive",
      });
    }
    if (workouts) {
      toast({
        title: "Workout created",
        variant: "success",
      });
      router.refresh();
      setOpen(false);

      return;
    }
  }

  const onEdit = async (values: z.infer<typeof formSchema>) => {
    const {workoutName} = values;

    if (user === null || user === undefined) {
      return toast({
        title: "Please login",
        variant: "destructive",
      });
    }
    if (!workoutId)
      return toast({
        title: "Workout id not found",
        variant: "destructive",
      });
    const {workouts, error} = await PutUpdateWorkout(workoutName, workoutId);

    if (error) {
      return toast({
        title: error,
        variant: "destructive",
      });
    }
    if (workouts) {
      toast({
        title: "Workout created",
        variant: "success",
      });
      router.refresh();
      setOpen(false);

      return;
    }
  };

  useEffect(() => {
    if (isEdit) {
      form.setValue("workoutName", name ?? "");
    }
  }, [isEdit]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(isEdit ? onEdit : onSubmit)}>
        <FormField
          control={form.control}
          name="workoutName"
          render={({field}) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="PPL" {...field} />
              </FormControl>
              {form.formState.errors.workoutName ? <FormMessage /> : null}
            </FormItem>
          )}
        />
        <Button type="submit">{isEdit ? "Edit" : "Create"}</Button>
      </form>
    </Form>
  );
}
