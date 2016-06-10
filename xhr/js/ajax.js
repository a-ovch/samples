var SUCCESS_HTTP_STATUS     = 200;

var UPDATE_TIME_URL         = '/ajax/xhr/get_current_time.php';
var UPDATE_TIME_INTERVAL    = 1000;

var UNIX_TIMESTAMP_INDEX    = 'unix_timestamp';

var timeSpan = document.getElementById('currentTime');

function startUpdateTime()
{
    setInterval(updateTime, UPDATE_TIME_INTERVAL);
}

function updateTime()
{
    var xhr = new XMLHttpRequest();

    /** xhr.open(method, url, async, user, password); */
    xhr.open('GET', UPDATE_TIME_URL, true);
    xhr.onload = function() {
        if (xhr.readyState == 4)  // 0 - Unitialized; 1 - Loading; 2 - Loaded; 3 - Interactive; 4 - Complete
        {
            if (xhr.status == SUCCESS_HTTP_STATUS)
            {
                var response = JSON.parse(xhr.responseText);
                var unixTimestamp = (response[UNIX_TIMESTAMP_INDEX] !== undefined) ? response[UNIX_TIMESTAMP_INDEX] : 0;
                timeSpan.textContent = convertUnixTimestampToTimeStr(unixTimestamp);
            }
        }
    };
    xhr.onerror = function() {
        processError(xhr);
    };

    xhr.send();
}

function convertUnixTimestampToTimeStr(unixTimestamp)
{
    var unixTimestampInSeconds = unixTimestamp * 1000;
    var date = new Date(unixTimestampInSeconds);

    return date.toLocaleTimeString();
}

function processError(xhr)
{
    var errorInfo = xhr.status + ': ' + xhr.statusText;
    console.error('Произошла ошибка! ' + errorInfo);
}