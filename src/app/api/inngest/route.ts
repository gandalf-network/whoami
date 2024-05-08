import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { crawlRottenTomatoesTask } from "@/inngest/functions/crawlRottenTomatoe";
import { stateThresholdCheckHandlerTask } from "@/inngest/functions/handleThresholdCheck";
import { queryActivitiesTask } from "@/inngest/functions/queryActivities";
import { queryShowDataTask } from "@/inngest/functions/queryShowData";
import { starSignPickerTask } from "@/inngest/functions/starSignPicker";
import { stateThresholdCheckTask } from "@/inngest/functions/stateThresholdCheck";
import { tvBFFTask } from "@/inngest/functions/tvBFF";
import { tvShowQuipsTask } from "@/inngest/functions/tvShowQuips";

export const maxDuration = 180;

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    queryActivitiesTask,
    queryShowDataTask,
    tvShowQuipsTask,
    crawlRottenTomatoesTask,
    starSignPickerTask,
    tvBFFTask,
    stateThresholdCheckTask,
    stateThresholdCheckHandlerTask,
  ],
});
