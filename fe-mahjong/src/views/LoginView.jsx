import BasicButton from "../components/BasicButton";
import LongInputBar from "../components/LongInputBar";
import { Link } from "react-router-dom";

export default function PageLogin() {
  return (
    <>
      <div className="h-screen bg-[#3d476a] grid place-items-center">
        <div className="w-5/6">
          <div className="flex flex-col m-2 px-4 py-3 bg-[#060628] rounded-md shadow-2xl">
            <LongInputBar
              prop_label={"Email address"}
              prop_requiredLabel={true}
              prop_placeholderText={"type your email here..."}
            />
          </div>
          <div className="flex flex-col m-2 px-4 py-3 bg-[#060628] rounded-md shadow-2xl">
            <LongInputBar
              prop_type={"password"}
              prop_label={"Password"}
              prop_requiredLabel={true}
              prop_placeholderText={"type your password here..."}
            />
          </div>
          <div className="flex justify-around ">
            <Link to="/">
              <BasicButton prop_buttonName={"Login"} />
            </Link>
            <BasicButton prop_buttonName={"Register"} />
          </div>
        </div>
      </div>
    </>
  );
}
