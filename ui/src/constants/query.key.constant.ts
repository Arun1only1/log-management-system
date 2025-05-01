interface IQueryKey {
  GET_ACTIVE_IP: string;
  GET_TOTAL_EVENTS: string;
  GET_COMMON_METHOD: string;
  GET_COMMON_STATUS_CODE: string;
  GET_COMMON_RESPONSE_SIZE: string;
  GET_TOP_USER_AGENT: string;
}

const queryKey: IQueryKey = {
  GET_ACTIVE_IP: "get-active-ip",
  GET_TOTAL_EVENTS: "get-total-events",
  GET_COMMON_METHOD: "get-common-method",
  GET_COMMON_STATUS_CODE: "get-common-status-code",
  GET_COMMON_RESPONSE_SIZE: "get-common-response-size",
  GET_TOP_USER_AGENT: "get-top-user-agent",
};

export { queryKey as QUERY_KEY };
