const fs = require('fs');

fs.writeFileSync('config/version.json', `{"version": "${process.env.GIT_VERSION}"}`);

//TODO: if exists version.bak use that