const fs = require('fs');
const path = require('path');

const files = require('child_process').execSync('git ls-files').toString().split('\n').filter(Boolean);
const projectRoot = process.cwd();

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const content = fs.readFileSync(path.join(projectRoot, file), 'utf8');
    const importRegex = /from\s+['"](@\/|\.\.\/|\.\/)([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      let importPath = match[2];
      const prefix = match[1];
      
      let absolutePath = '';
      if (prefix === '@/') {
        absolutePath = path.join(projectRoot, 'src', importPath);
      } else {
        const dir = path.dirname(file);
        absolutePath = path.resolve(dir, prefix + importPath);
      }

      // Handle extensionless imports
      const extensions = ['.tsx', '.ts', '.jsx', '.js'];
      let foundPath = null;
      
      // Check if it's a directory (index file)
      if (fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isDirectory()) {
        for (const ext of extensions) {
          const indexFile = path.join(absolutePath, `index${ext}`);
          if (fs.existsSync(indexFile)) {
            foundPath = indexFile;
            break;
          }
        }
      } else {
        for (const ext of extensions) {
          const fullPath = absolutePath + ext;
          if (fs.existsSync(fullPath)) {
            foundPath = fullPath;
            break;
          }
        }
      }

      if (foundPath) {
        // Check if the case matches exactly
        const relativeFoundPath = path.relative(projectRoot, foundPath);
        const expectedPath = (prefix === '@/') 
          ? 'src/' + importPath + (foundPath.endsWith('.tsx') ? '.tsx' : foundPath.endsWith('.ts') ? '.ts' : '')
          : path.relative(projectRoot, foundPath);
        
        // This is tricky because of the relative paths.
        // Let's just check if the file exists with a different case.
      }
    }
  }
});
