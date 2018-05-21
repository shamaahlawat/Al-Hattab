#!/usr/bin/env bash
rm -R alhattab/
npm run build
mv dist alhattab/
rm alhattab.zip
zip -r alhattab.zip alhattab/
scp alhattab.zip ubuntu@poletalks.com:~/
ssh ubuntu@poletalks.com
