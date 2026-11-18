import { useState } from "react";
import { Outlet } from "react-router-dom";
import SupervisorPinGate from "../components/SupervisorPinGate";
import SettingsButton from "../components/SettingsButton";

export default function SupervisorGuardedLayout() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("supervisorAuthed") === "true");

  function onSuccess() {
    sessionStorage.setItem("supervisorAuthed", "true");
    setAuthed(true);
  }

  if (!authed) {
    return (
      <>
        {" "}
        <SettingsButton />
        <SupervisorPinGate onSuccess={onSuccess} />
      </>
    );
  }

  return (
    <>
      {" "}
      <SettingsButton />
      <Outlet />
    </>
  );
}
