# Report #
## Day 1 Assignment ##
### Vagrant ###
Býr til lítið virtual environment á virtual machine með mismunandi týpur af environment fyrir mismunandi týpur af developers
### VirtualBox ###
leyfir manni að keyra önnur stýrikerfi inní sama eða öðru stýrikerfi
### Grunt ###
Task runner, segir hvaða forrit á að keyra með hvaða arguments og i hvaða röð. t.d. Keyra fyrst JShint svo minify-a kóðann, svo keyra serverinn á port 9000, með watch....
### npm ###
package manager fyrir node.js
### nodejs ###
framework fyrir network applications
### bower ###
package manager fyrir network oriented applications.

## Jenkins Build Scripts ##
### Commit / Push ###
    npm install
    bower install
    ./dockerbuild.sh

### Deployment ###
    ./deploymentScript.sh
    export ACCEPTANCE_URL=http://192.168.33.10
