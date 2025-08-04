import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenText, Music, Plus, Settings, Video } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export function VideoDownloadSettings() {
  const formSchema = z.object({
    quality: z.string(),
    fps: z.string(),
    audioQuality: z.string(),
    bitrate: z.string(),
    format: z.string(),
    audioFormat: z.string(),
    audioOnly: z.boolean(),
    subtitles: z.boolean(),
    subtitlesLanguage: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quality: '',
      fps: '',
      format: '',
      bitrate: '',
      audioQuality: '',
      audioFormat: '',
      audioOnly: false,
      subtitles: false,
      subtitlesLanguage: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings />
          <p>Configurações de Download</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue="video" className="flex w-full gap-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="video"
                  preventSelect={form.watch('audioOnly')}
                  className="flex items-center gap-2"
                >
                  <Video className="size-4" />
                  Vídeo
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Music className="size-4" />
                  Áudio
                </TabsTrigger>
                <TabsTrigger value="others" className="flex items-center gap-2">
                  <Settings className="size-4" />
                  Outros
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="space-y-4">
                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualidade do vídeo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a qualidade" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="1080p">1080p</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FPS do vídeo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o FPS" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="60">60 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formato do vídeo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o formato" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mp4">MP4</SelectItem>
                          <SelectItem value="mkv">MKV</SelectItem>
                          <SelectItem value="webm">WebM</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bitrate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bitrate do vídeo (opcional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o bitrate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1000">1000 kbps</SelectItem>
                          <SelectItem value="2000">2000 kbps</SelectItem>
                          <SelectItem value="4000">4000 kbps</SelectItem>
                          <SelectItem value="8000">8000 kbps</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="audio" className="space-y-4">
                <FormField
                  control={form.control}
                  name="audioFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formato do áudio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o formato do áudio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="mp3">MP3</SelectItem>
                          <SelectItem value="m4a">M4A</SelectItem>
                          <SelectItem value="wav">WAV</SelectItem>
                          <SelectItem value="opus">Opus</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="audioQuality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualidade do áudio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a qualidade do áudio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="128">128 kbps</SelectItem>
                          <SelectItem value="192">192 kbps</SelectItem>
                          <SelectItem value="320">320 kbps</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="others" className="space-y-4">
                <FormField
                  control={form.control}
                  name="audioOnly"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>
                          <Music className="size-4" />
                          Apenas Áudio
                        </FormLabel>
                        <FormDescription>
                          Baixar somente o áudio do vídeo
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="subtitles"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>
                          <BookOpenText className="size-4" />
                          Legendas
                        </FormLabel>
                        <FormDescription>
                          Baixar legendas disponíveis
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="subtitlesLanguage"
                  disabled={!form.watch('subtitles')}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idioma das legendas</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={field.disabled}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o idioma" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pt">Português</SelectItem>
                          <SelectItem value="en">Inglês</SelectItem>
                          <SelectItem value="es">Espanhol</SelectItem>
                          <SelectItem value="auto">Automático</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full p-4 text-lg">
              <Plus className="size-6" />
              <p>Adicionar a fila</p>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
