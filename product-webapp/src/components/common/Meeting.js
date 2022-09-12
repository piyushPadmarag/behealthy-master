import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";

const Meeting = () => {
    // Init Meeting Provider
    return (
        <MeetingProvider
            config={{
                meetingId: "<Id-on-meeting>",
                name: "<Name-of-participant>",
                micEnabled: "<Flag-to-enable-mic>",
                webcamEnabled: "<Flag-to-enable-webcam>",
                maxResolution: "<Maximum-resolution>",
            }}
            token={"<Authentication-token>"}
        >
            <MeetingView>...</MeetingView>
        </MeetingProvider>
    );
};

const MeetingView = () => {
    // Get Meeting object using useMeeting hook
    const meeting = useMeeting();

    return <>...</>;
};