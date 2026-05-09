 

const Loading = (loadingMsg) => {
     console.log("loading---",loadingMsg)
    return (
        <div>
            <p className="text-red-500 text-center">{loadingMsg}................. <span className="loading loading-ring loading-xl"></span></p>;
        </div>
    );
};

export default Loading;