import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenText, Music, Plus, Settings, Video } from 'lucide-react';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
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
import { VideoFormat, videoSettingsFormSchema } from '..';

interface VideoDownloadSettingsProps {
  form: UseFormReturn<z.infer<typeof videoSettingsFormSchema>>;
  onSubmit: (values: z.infer<typeof videoSettingsFormSchema>) => void;
  formats: VideoFormat[] | undefined;
}

export function VideoDownloadSettings({ formats, form, onSubmit }: VideoDownloadSettingsProps) {
  const watchQuality = form.watch("quality");
  const watchFormat = form.watch("format");
  const watchFps = form.watch("fps");

  const qualities = [...new Set(
    formats
      ?.map(f => f.height || "")
      .filter(h => h !== "")
  )];

  const formatsFiltered = watchQuality
    ? [...new Set(
      formats
        ?.filter(f => (f.height || "") === watchQuality)
        .map(f => f.ext || "")
        .filter(ext => ext !== "")
    )]
    : [];

  const fpsFiltered = watchFormat
    ? [...new Set(
      formats
        ?.filter(
          f =>
            (f.height || "") === watchQuality &&
            (f.ext || "") === watchFormat
        )
        .map(f => f.fps || "")
        .filter(fps => fps !== "")
    )]
    : [];

  const bitrateFiltered = watchFps
    ? [...new Set(
      formats
        ?.filter(
          f =>
            (f.height || "") === watchQuality &&
            (f.ext || "") === watchFormat &&
            (f.fps || "") === watchFps
        )
        .map(f => f.tbr || "")
        .filter(tbr => tbr !== "")
    )]
    : [];


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
                  <p>Vídeo</p>
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Music className="size-4" />
                  <p>Áudio</p>
                </TabsTrigger>
                <TabsTrigger value="others" className="flex items-center gap-2">
                  <Settings className="size-4" />
                  <p>Outros</p>
                </TabsTrigger>
              </TabsList>


              <TabsContent value="video" className="space-y-4">
                <FormField
                  control={form.control}
                  name="quality"
                  disabled={!formats || formats.length === 0}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qualidade do vídeo</FormLabel>
                      <Select
                        disabled={field.disabled}
                        onValueChange={val => {
                          field.onChange(val);
                          form.setValue("format", "");
                          form.setValue("fps", "");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a qualidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {qualities.map(q => (
                            <SelectItem key={q} value={q}>
                              {q}p
                            </SelectItem>
                          )).reverse()}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Formato */}
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formato do vídeo</FormLabel>
                      <Select
                        onValueChange={val => {
                          field.onChange(val);
                          form.setValue("fps", "");
                        }}
                        value={field.value}
                        disabled={!watchQuality}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o formato" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formatsFiltered.map(ext => (
                            <SelectItem key={ext} value={ext}>
                              {ext.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* FPS */}
                <FormField
                  control={form.control}
                  name="fps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FPS do vídeo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!watchFormat}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o FPS" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fpsFiltered.map(fps => (
                            <SelectItem key={fps} value={fps}>
                              {fps} FPS
                            </SelectItem>
                          ))}
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
                        value={field.value}
                        disabled={!watchFps}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o bitrate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bitrateFiltered.map(bitrate => (
                            <SelectItem key={bitrate} value={bitrate}>
                              {bitrate} kbps
                            </SelectItem>
                          ))}
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
                        <FormLabel className="flex items-center gap-2">
                          <Music className="size-4" />
                          <p>Apenas Áudio</p>
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
                        <FormLabel className="flex items-center gap-2">
                          <BookOpenText className="size-4" />
                          <p>Legendas</p>
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
