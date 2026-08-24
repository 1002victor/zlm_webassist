const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const context = {};
vm.createContext(context);
vm.runInContext(
    fs.readFileSync(path.join(projectRoot, "js", "utils.js"), "utf8"),
    context
);

test("formats network bitrate with bit units", () => {
    assert.equal(context.bitsString(999), "999bit");
    assert.equal(context.bitsString(1000), "1.00Kbit");
    assert.equal(context.bitsString(1000 * 1000), "1.00Mbit");
    assert.equal(context.bitsString(1000 * 1000 * 1000), "1.00Gbit");
});

test("the media list uses bit formatting for bytesSpeed", () => {
    const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
    assert.match(
        indexHtml,
        /bitsSpeed:\s*function\s*\(val\)\s*{\s*return bitsString\(val \* 8\);\s*}/
    );
});
