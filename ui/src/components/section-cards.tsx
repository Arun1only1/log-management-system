import CommonResponseSizeCard from "./feature/stat-card/common-response-size-card";
import MostActiveIpCard from "./feature/stat-card/most-active-ip-card";
import MostCommonMethodCard from "./feature/stat-card/most-common-method-card";
import TopHttpStatusCodeCard from "./feature/stat-card/top-status-code-card";
import TopUserAgentCard from "./feature/stat-card/top-user-agent-card";
import TotalEventsCard from "./feature/stat-card/total-events-card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <TotalEventsCard />
      <MostActiveIpCard />
      <MostCommonMethodCard />
      <TopHttpStatusCodeCard />
      <CommonResponseSizeCard />
      <TopUserAgentCard />
    </div>
  );
}
