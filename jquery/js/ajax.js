var UPDATE_TIME_URL         = '/jquery/get_current_time.php';
var UPDATE_TIME_INTERVAL    = 1000;

var UNIX_TIMESTAMP_INDEX    = 'unix_timestamp';

var timeSpan = $('#currentTime');

function startUpdateTime()
{
    setInterval(updateTime, UPDATE_TIME_INTERVAL);
}

function updateTime()
{
    $.ajax({
        url: UPDATE_TIME_URL,
        method: 'GET',
        dataType: 'json',
        success: onSuccess,
        error: onError
    });
}

function convertUnixTimestampToTimeStr(unixTimestamp)
{
    var unixTimestampInSeconds = unixTimestamp * 1000;
    var date = new Date(unixTimestampInSeconds);

    return date.toLocaleTimeString();
}

function onSuccess(data, jqXhr, textStatus)
{
    var unixTimestamp = (data[UNIX_TIMESTAMP_INDEX] !== undefined) ? data[UNIX_TIMESTAMP_INDEX] : 0;
    timeSpan.text(convertUnixTimestampToTimeStr(unixTimestamp));
}

function onError(jqXhr, textStatus, errorThrown)
{
    var errorInfo = jqXhr.status + ': ' + jqXhr.statusText;
    console.error('Произошла ошибка! ' + errorInfo);
}