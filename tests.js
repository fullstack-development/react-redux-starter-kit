const context = require.context('./src', true, /-tests?\.tsx?$/);
context.keys().forEach(context);