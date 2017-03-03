.PHONY: test

deps:
	npm install -g eslint mocha istanbul
	npm install -g eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react
	npm i

lint:
	eslint .

test:
	make lint
	make cover

init:
	sed -i 's/{service-name}/$(NAME)/g' package.json
	sed -i 's/{service-name}/$(NAME)/g' README.md
	sed -i 's/{service-name}/$(NAME)/g' sonar-project.properties

cover:
	istanbul cover _mocha -- test --recursive --timeout=10000

sonar:
	sed '/sonar.projectVersion/d' ./sonar-project.properties > tmp && mv tmp sonar-project.properties
	echo sonar.projectVersion=`cat package.json | python -c "import json,sys;obj=json.load(sys.stdin);print obj['version'];"` >> sonar-project.properties
	wget https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-2.8.zip
	unzip sonar-scanner-2.8.zip
ifdef CI_PULL_REQUEST
	@sonar-scanner-2.8/bin/sonar-runner -e -Dsonar.analysis.mode=preview -Dsonar.github.pullRequest=${shell basename $(CI_PULL_REQUEST)} -Dsonar.github.repository=$(REPO_SLUG) -Dsonar.github.oauth=$(GITHUB_TOKEN) -Dsonar.login=$(SONAR_LOGIN) -Dsonar.password=$(SONAR_PASS) -Dsonar.host.url=$(SONAR_HOST_URL)
endif
ifeq ($(CIRCLE_BRANCH),develop)
	@sonar-scanner-2.8/bin/sonar-runner -e -Dsonar.analysis.mode=publish -Dsonar.host.url=$(SONAR_HOST_URL) -Dsonar.login=$(SONAR_LOGIN) -Dsonar.password=$(SONAR_PASS)
endif
	rm -rf sonar-scanner-2.8 sonar-scanner-2.8.zip