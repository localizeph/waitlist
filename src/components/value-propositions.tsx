'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudUpload,
  CheckCircle2,
  Clock,
  BarChart3,
  Monitor,
} from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Progress } from '~/components/ui/progress';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ValuePropositions() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          setIsLive(true);
          setTimeout(() => {
            setIsLive(false);
            setUploadProgress(0);
          }, 4000);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 p-4 max-w-4xl mx-auto"
    >
      {/* 1. PUBLISH WITHOUT INTERMEDIARIES - Enhanced Animation */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-border/50 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-0 flex flex-col lg:flex-row">
            {/* Left: Copy */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg">
                  <CloudUpload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Publish without intermediaries
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Upload your media, select a city package, and schedule a time window.
                The campaign goes live automatically — no agency handoff or permits required.
              </p>
            </div>

            {/* Right: Animation */}
            <div className="flex-1 bg-muted/50 dark:bg-muted/20 p-6 lg:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border/50">
              <AnimatePresence mode="wait">
                {isLive ? (
                  // Live State
                  <motion.div
                    key="live"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3 p-4 bg-background rounded-lg border border-emerald-500/30 shadow-sm">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium">Live across Iloilo City</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    </div>
                  </motion.div>
                ) : (
                  // Loading State
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-muted-foreground truncate max-w-xs">
                          campaign_iloilo_q2.mp4
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Uploading
                        </Badge>
                      </div>
                      <Progress value={uploadProgress} className="h-2.5" />
                      <div className="text-xs text-muted-foreground text-right">
                        {Math.round(uploadProgress)}%
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. TIME SLOTS */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-border/50 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-0 flex flex-col lg:flex-row">
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Known Inventory
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Each city package has finite slots per window. Booking a slot guarantees
                delivery within the scheduled period with real-time capacity tracking.
              </p>
            </div>

            <div className="flex-1 bg-muted/50 dark:bg-muted/20 p-6 lg:p-8 space-y-5 border-t lg:border-t-0 lg:border-l border-border/50">
              {[
                { label: 'Morning Rush', time: '07:00 – 09:30', fill: 18, campaigns: 3 },
                { label: 'Lunch Hour', time: '11:30 – 13:00', fill: 54, campaigns: 7 },
                { label: 'Evening Commute', time: '17:00 – 19:30', fill: 91, campaigns: 11, critical: true },
              ].map((slot) => (
                <div key={slot.label} className="space-y-2">
                  <div className="flex justify-between items-end gap-2">
                    <span className="text-sm font-medium">{slot.label}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{slot.time}</span>
                  </div>
                  <Progress value={slot.fill} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{slot.campaigns} campaigns</span>
                    <span className={slot.critical ? "text-destructive font-semibold" : ""}>
                      {100 - slot.fill} slots left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. PLAY DATA */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border border-border/50 shadow-none hover:shadow-sm transition-shadow">
          <CardContent className="p-0 flex flex-col lg:flex-row">
            <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Play data per asset
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Track play count, timestamps, and specific device performance.
                Data is exportable for client reporting or compliance documentation.
              </p>
            </div>

            <div className="flex-1 bg-muted/50 dark:bg-muted/20 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border/50">
              <div className="bg-background rounded-lg border border-border/50 divide-y divide-border/30">
                <div className="p-3 grid grid-cols-3 gap-2 text-xs uppercase font-semibold text-muted-foreground tracking-tight">
                  <span>Asset</span>
                  <span className="text-center">Plays</span>
                  <span className="text-right">Last</span>
                </div>
                {[
                  { file: 'brand_q2.mp4', count: 284, time: '07:42 AM' },
                  { file: 'promo_sale.mp4', count: 119, time: '08:17 AM' },
                  { file: 'launch_15s.mp4', count: 57, time: '08:51 AM' },
                ].map((item) => (
                  <div key={item.file} className="p-3 grid grid-cols-3 gap-2 items-center">
                    <span className="text-xs font-mono truncate text-foreground/80">{item.file}</span>
                    <span className="text-sm font-semibold text-center">{item.count}</span>
                    <span className="text-xs text-muted-foreground text-right">{item.time}</span>
                  </div>
                ))}
                <div className="p-3 bg-muted/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-muted-foreground">Devices Reached</span>
                  </div>
                  <span className="font-semibold text-primary">23 screens</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
