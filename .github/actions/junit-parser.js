const core = require("@actions/core");
const github = require("@actions/github");

const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

try {
    const xmlReport = core.getInput("junit-parser");

    const parser = new XMLParser();
    let jObj = parser.parse(xmlReport);
    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj);
    
    core.setOutput("html-report", xmlContent);
    
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

} catch (error) {
    core.setFailed(error.message);
}
