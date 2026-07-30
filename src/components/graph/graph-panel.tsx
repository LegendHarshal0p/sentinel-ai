import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, type ComponentProps } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const BlastGraph = lazy(() => import("./blast-graph"));

export function GraphPanel(props: ComponentProps<typeof BlastGraph>) {
  const fallback = <Skeleton className="h-[520px] w-full rounded-2xl" />;
  return (
    <ClientOnly fallback={fallback}>
      <Suspense fallback={fallback}>
        <BlastGraph {...props} />
      </Suspense>
    </ClientOnly>
  );
}
