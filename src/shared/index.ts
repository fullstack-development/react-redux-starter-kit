const testContext = (require as any).context('./', true, /^.*\/(?!.*test).*\.tsx?$/);
testContext.keys().forEach(testContext);
