export const convertTime = (timeInMilliseconds: number) => {
    const seconds = +((timeInMilliseconds / 1000).toFixed());
    const minutes = (seconds / 60).toFixed();

    const minuteString = ('0' + minutes).slice(-2);
    const secondsString = ('0' + seconds).slice(-2);

    return minuteString + ":" + secondsString;
}