"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useUser} from "@clerk/nextjs";
import {useState} from "react";

import {useToast} from "../ui/use-toast";
import {ToastAction} from "../ui/toast";
import {LoadingSpinner} from "../icons/icons";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PostAddClient} from "@/queries/clients";

const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
});

interface AddClientsFormProps {
  handleChangeModal: () => void;
}

export default function AddClientsForm({handleChangeModal}: AddClientsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const {user} = useUser();
  const {toast} = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const {username} = values;
    const userId = user?.id ?? "";
    const {friends, friendsError} = await PostAddClient(userId, username);

    if (friendsError === "User not found") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "User not found.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);

      return;
    }
    if (friendsError === "User already sent a friend request") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You has been sent a friend request to this user already.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);

      return;
    }
    if (friends) {
      toast({
        variant: "default",
        title: "Success!",
        description: "Friend request sent successfully.",
      });

      setIsLoading(false);
      handleChangeModal();
      form.reset();

      return;
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username123" {...field} />
              </FormControl>
              {form.formState.errors.username ? <FormMessage /> : null}
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? <LoadingSpinner /> : "Add"}</Button>
      </form>
    </Form>
  );
}
