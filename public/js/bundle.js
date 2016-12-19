
function submitForm(frm, fnSucces, fnFail) {
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var data = $(frm).serialize();

    // process the form
    $.ajax({
        type        : 'POST',         // define the type of HTTP verb we want to use (POST for our form)
        url         : location.href,  // the url where we want to POST
        data        : data,           // our data object
        dataType    : 'json',         // what type of data do we expect back from the server
        encode      : true
    })
    .done(function(resp, b, xhr) {
        // log data to the console so we can see
        // console.log(data); 
        if (resp.status==='ok') {
          if ($.isFunction(fnSucces)) fnSucces(resp, b, xhr);
        } else  {
          if ($.isFunction(fnFail)) fnFail(resp, b, xhr);
        }
    });

}

