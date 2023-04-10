import SuccessSection from "@/components/SuccessSection";
import { useRouter } from "next/router";

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();

  return <SuccessSection sessionId={session_id as string} />;
};

export default Success;
