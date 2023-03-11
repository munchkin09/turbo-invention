import core from '@actions/core';
import github from '@actions/github';

import { XMLParser, XMLBuilder } from 'fast-xml-parser';

async function run() {
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
    }}

run();

