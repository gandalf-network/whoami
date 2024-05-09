import { serve } from "inngest/next";

import { inngest } from "@/actions/inngest/client";
import { crawlRottenTomatoesTask } from "@/actions/inngest/functions/crawlRottenTomatoe";
import { stateThresholdCheckHandlerTask } from "@/actions/inngest/functions/handleThresholdCheck";
import { queryActivitiesTask } from "@/actions/inngest/functions/queryActivities";
import { queryShowDataTask } from "@/actions/inngest/functions/queryShowData";
import { starSignPickerTask } from "@/actions/inngest/functions/starSignPicker";
import { stateThresholdCheckTask } from "@/actions/inngest/functions/stateThresholdCheck";
import { tvBFFTask } from "@/actions/inngest/functions/tvBFF";
import { tvShowQuipsTask } from "@/actions/inngest/functions/tvShowQuips";
import { firstPhaseHandlerTask } from "@/actions/inngest/functions/handleFirstPhase";

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
    firstPhaseHandlerTask,
    stateThresholdCheckTask,
    stateThresholdCheckHandlerTask,
  ],
});
