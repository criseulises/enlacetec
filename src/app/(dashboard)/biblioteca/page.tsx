"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Play,
  Clock,
  Eye,
  Star,
  FileText,
  Headphones,
  Hand,
  Subtitles,
  ListVideo,
  X,
  ChevronRight,
  Pause,
  Volume2,
  Maximize,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  featuredVideos,
  allVideos,
  playlists,
  subjectFilters,
  transcriptLines,
  getSubjectColor,
  type SubjectFilter,
  type VideoCard,
} from "@/lib/mock-data";

function AccessibilityIcon({ type }: { type: string }) {
  if (type.includes("Audio")) return <Headphones className="size-3 text-gray-700" />;
  if (type.includes("Señas") || type.includes("Lengua")) return <Hand className="size-3 text-gray-700" />;
  return <Subtitles className="size-3 text-gray-700" />;
}

function VideoThumbnail({ video, onClick }: { video: VideoCard; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden rounded-2xl border-none shadow-sm transition-shadow group-hover:shadow-lg">
        <div className={`relative aspect-video bg-gradient-to-br ${video.gradient}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
              <Play className="size-7 text-white" fill="white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white">
            {video.duration}
          </div>
          <div className="absolute left-2 top-2 flex gap-1">
            {video.hasTranscription && (
              <div className="rounded-md bg-white/90 p-1" title="Transcripcion disponible">
                <FileText className="size-3 text-gray-700" />
              </div>
            )}
            {video.accessibility.map((a) => (
              <div key={a} className="rounded-md bg-white/90 p-1" title={a}>
                <AccessibilityIcon type={a} />
              </div>
            ))}
          </div>
        </div>

        <CardContent className="p-3">
          <Badge
            className="mb-1.5 rounded-full text-[10px]"
            style={{
              backgroundColor: getSubjectColor(video.subject) + "20",
              color: getSubjectColor(video.subject),
            }}
          >
            {video.subject}
          </Badge>
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900">{video.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{video.volunteer}</p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="size-3" /> {video.views}
            </span>
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-amber-400 text-amber-400" /> {video.rating}
            </span>
            <span>{video.date}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function VideoPlayer({ video, onClose }: { video: VideoCard; onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTranscriptIdx, setActiveTranscriptIdx] = useState(5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <div className={`relative aspect-video bg-gradient-to-br ${video.gradient}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex size-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="size-10 text-white" fill="white" />
                  ) : (
                    <Play className="size-10 text-white" fill="white" />
                  )}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Progress value={35} className="mb-3 h-1" />
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                    </button>
                    <Volume2 className="size-4" />
                    <span>1:18 / {video.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-md bg-white/20 px-2 py-0.5 text-[10px]">1x</button>
                    <Subtitles className="size-4" />
                    <Maximize className="size-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <Badge
                className="mb-2 rounded-full"
                style={{
                  backgroundColor: getSubjectColor(video.subject) + "20",
                  color: getSubjectColor(video.subject),
                }}
              >
                {video.subject}
              </Badge>
              <h2 className="text-lg font-bold text-gray-900">{video.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {video.volunteer} &middot; {video.date} &middot; {video.views} vistas
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {video.hasTranscription && (
                  <Badge variant="outline" className="gap-1 rounded-full text-xs">
                    <FileText className="size-3" /> Transcripcion
                  </Badge>
                )}
                {video.accessibility.map((a) => (
                  <Badge key={a} variant="outline" className="gap-1 rounded-full text-xs">
                    <AccessibilityIcon type={a} /> {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full border-l lg:w-80">
            <div className="flex items-center justify-between border-b p-3">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <FileText className="size-4 text-[#1351aa]" /> Transcripcion
              </h3>
              <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
                <X className="size-4" />
              </Button>
            </div>
            <ScrollArea className="h-80 lg:h-[400px]">
              <div className="space-y-1 p-3">
                {transcriptLines.map((line, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTranscriptIdx(idx)}
                    className={`w-full rounded-lg p-2 text-left text-xs transition-colors ${
                      idx === activeTranscriptIdx
                        ? "bg-[#ffc107]/20 font-medium text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-2 text-[10px] text-muted-foreground">{line.time}</span>
                    {line.text}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BibliotecaPage() {
  const [activeFilter, setActiveFilter] = useState<SubjectFilter>("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);

  const filteredVideos = allVideos.filter((v) => {
    const matchesSubject = activeFilter === "Todas" || v.subject === activeFilter;
    const matchesSearch =
      !searchQuery ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header + Search */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <BookOpen className="size-7 text-[#1351aa]" />
          Biblioteca de Cursos
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todas las clases grabadas, disponibles para ti en cualquier momento
        </p>
        <div className="mt-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por tema, materia o voluntario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl pl-10"
            />
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {subjectFilters.map((f) => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(f.label)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              activeFilter === f.label
                ? "text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={activeFilter === f.label ? { backgroundColor: f.color } : undefined}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
          <Star className="size-4 fill-amber-400 text-amber-400" />
          Clases Mas Populares
        </h2>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {featuredVideos.map((video) => (
              <div key={video.id} className="w-72 flex-none">
                <VideoThumbnail video={video} onClick={() => setSelectedVideo(video)} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* All recordings grid */}
      <div>
        <h2 className="mb-3 text-base font-bold text-gray-900">
          Todas las Grabaciones ({filteredVideos.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </div>
        {filteredVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="mb-3 size-10 text-gray-300" />
            <p className="text-sm text-muted-foreground">
              No se encontraron grabaciones con esos filtros
            </p>
          </div>
        )}
      </div>

      {/* Playlists */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
          <ListVideo className="size-5 text-[#7c4dff]" />
          Listas de Reproduccion del CTC
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {playlists.map((pl) => (
            <motion.div key={pl.id} whileHover={{ y: -3 }}>
              <Card className="group cursor-pointer overflow-hidden rounded-2xl border-none shadow-sm transition-shadow hover:shadow-lg">
                <div
                  className={`relative h-28 bg-gradient-to-br p-4 ${pl.gradient}`}
                >
                  <h3 className="text-lg font-bold text-white">{pl.title}</h3>
                  <p className="mt-1 text-xs text-white/80">{pl.description}</p>
                  <div className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Play className="size-5 text-white" fill="white" />
                  </div>
                </div>
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ListVideo className="size-3" /> {pl.sessionCount} clases
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" /> {pl.totalDuration}
                    </span>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video player modal */}
      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
