var SCRIPT_PROP = PropertiesService.getScriptProperties();

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}

function doGet(e) {
  try {
    Logger.log(e);

    MailApp.sendEmail(
      e.parameters["Email Address"],
      "Camp Registration Confirmation",
      "Hi, " +
        e.parameters["First Name"] +
        "!\n\n" +
        "Thanks for signing up for camp!\n" +
        "Feel free to reply to this email with any questions.\n\n" +
        "See you soon,\n" +
        "The Willy Camp Team",
      { name: "Willy Camp" }
    );

    MailApp.sendEmail(
      "awillygoodcamp@gmail.com",
      "New Willy Camp Registration",
      e.parameters["First Name"] +
        " " +
        e.parameters["Last Name"] +
        " just registered. Check out all registrations below.\n\n" +
        "https://docs.google.com/spreadsheets/d/1A15LqjGThBQRdqg9glpWpk73beUR9D3Kr-cwln0XXUQ/"
    );

    recordData(e);

    var data = JSON.stringify({
      result: "success",
      data: JSON.stringify(e.parameters),
    });

    return ContentService.createTextOutput(
      e.parameter.callback + "(" + data + ")"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch (error) {
    Logger.log(error);

    var data = JSON.stringify({
      result: "error",
      error: e,
    });

    return ContentService.createTextOutput(
      e.parameter.callback + "(" + data + ")"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function recordData(e) {
  Logger.log(JSON.stringify(e));

  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName("responses");
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var row = [new Date()];

    for (var i = 1; i < headers.length; i++) {
      if (headers[i].length > 0) {
        var value = e.parameter[headers[i]];
        row.push(value ? value : "");
      }
    }

    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  } catch (error) {
    Logger.log(e);
  } finally {
    return;
  }
}
