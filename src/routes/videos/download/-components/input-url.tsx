import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Search, Link } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { InputUrlformSchema } from '../index.tsx';

interface InputUrlProps {
  form: UseFormReturn<z.infer<typeof InputUrlformSchema>>;
  onSubmit: (values: z.infer<typeof InputUrlformSchema>) => void;
}

export function InputUrl({ form, onSubmit }: InputUrlProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Link />
          <p>URL do Vídeo</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center space-x-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="https://www.exemplo.com"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Search />
              <p>Buscar</p>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
