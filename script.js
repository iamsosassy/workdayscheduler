// display current date 
var CurrentDay = moment().format();
// local storage for text input
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        console.log('about to update', key, 'with this from local S', value)
        $(`#text${key}`).text(value);
    }
}
// function for currentday
$(document).ready(function () {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    console.log('current time hour!!', moment().hours())
    var currentHour = moment().hours()
    for (let i = 9; i < 18; i++) {


        // create a row
        var row = $(`<div data-time=${i} id='${i}' class="row time-block"></div>`);

        // create a column
        var col1 = $('<div class="col-sm-2 hour">' + i + 'am' + '</div>');

        if (i > 12) {
            var newDisplay = i - 12
            newDisplay += 'pm'
            col1.text(newDisplay)
        }

        //create column 2
        var col2 = $(`<textarea id=text${i} class="description col-sm-8" placeholder="Add your event here..."></textarea>`);
        if (i == currentHour) {
            col2.addClass("present");
        } else if (currentHour > i) {
            col2.addClass("past");
        } else if (currentHour < i) {
            col2.addClass('future')
        }
        //create column 3
        var col3 = $(`<button id=${i}  class="saveBtn col-sm-2 fas fa-save"></button>`)

        // append col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // last step add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }


    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function () {
        let eventId = $(this).attr('id');
        let eventText = $(this).siblings('.description').val();
        console.log('about to save tolocal storage!', eventId, eventText)
        localStorage.setItem(eventId, eventText);
    });

});