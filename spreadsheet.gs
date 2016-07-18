var SCRIPT_PROP = PropertiesService.getScriptProperties();

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty('key', doc.getId());
}

function doGet(e) {
  try {
    Logger.log(e);

    MailApp.sendEmail(
      e.parameters['Email Address'],
      'Willy Camp Registration Confirmation',
      'Hi, ' + e.parameters['First Name'] + '!\n\r' +
        'Thanks for signing up! Feel free to reply to this email with any questions.\n\r'
    );

    MailApp.sendEmail(
      'awillygoodcamp@gmail.com',
      'New Willy Camp Registration',
      e.parameters['First Name'] + ' ' + e.parameters['Last Name'] +
        ' just registered. Check out all registrations below.\n\r' +
        'https://docs.google.com/spreadsheets/d/1A15LqjGThBQRdqg9glpWpk73beUR9D3Kr-cwln0XXUQ/'
    );

    recordData(e);

    var data = JSON.stringify({
      'result': 'success',
      'data': JSON.stringify(e.parameters)
    });

    return ContentService.createTextOutput(
      e.parameter.callback + "(" + data + ")"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch(error) {
    Logger.log(error);

    var data = JSON.stringify({
      'result': 'error',
      'error': e
    });

    return ContentService.createTextOutput(
      e.parameter.callback + "(" + data + ")"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function recordData(e) {
  Logger.log(JSON.stringify(e));

  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
    var sheet = doc.getSheetByName('responses');
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    var row = [new Date()];

    for (var i = 1; i < headers.length; i++) {
      if (headers[i].length > 0) {
        row.push(e.parameter[headers[i]]);
      }
    }

    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
  } catch(error) {
    Logger.log(e);
  } finally {
    return;
  }
}
