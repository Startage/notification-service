import fs from 'fs';
import path from 'path';

export const loadTemplate = async ({
  fileTemplateName,
}: {
  fileTemplateName: string;
}): Promise<string> => {
  return (
    await fs.readFileSync(
      path.join(
        path.dirname(require.main.filename),
        'templates',
        fileTemplateName,
      ),
    )
  ).toString();
};
