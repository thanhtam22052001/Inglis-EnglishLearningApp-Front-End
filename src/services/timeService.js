export const timeFormat = (
  time,
  minuteString = 'phút',
  secondString = 'giây',
) => {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return (minutes != 0 ? minutes.toString().concat(` ${minuteString}, `) : '')
    .concat(seconds.toString())
    .concat(` ${secondString}`);
};
