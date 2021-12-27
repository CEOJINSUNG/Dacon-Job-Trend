(function() {
    var gitConnector = tableau.makeConnector();

    gitConnector.getSchema = function(schemaCallback) {
        var cols = [
            {
                id: "name",
                dataType: tableau.dataTypeEnum.string
            }, 
            {
                id: "node_id",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "html_url",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "description",
                dataType: tableau.dataTypeEnum.string
            },
            {
                // 대표 언어
                id: "language",
                dataType: tableau.dataTypeEnum.string
            },
            {
                // 구체적 언어 통계
                id: "languages_url",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "created_at",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "updated_at",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "git_commits_url",
                dataType: tableau.dataTypeEnum.string
            }
        ]

        var tableSchema = {
            id: "UserGithub",
            alias: "UserGit",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    gitConnector.getData = function(table, doneCallback) {
        var apiCall = "https://api.github.com/users/CEOJINSUNG/repos";

        $.getJSON(apiCall, function(resp) {
            var response = JSON.parse(JSON.stringify(resp)),
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = response.length; i < len; i++) {
                tableData.push({
                    "name": response[i].name,
                    "node_id": response[i].node_id,
                    "html_url": response[i].html_url,
                    "description": response[i].description,
                    "language": response[i].language,
                    "languages_url": response[i].languages_url,
                    "created_at": response[i].created_at,
                    "updated_at": response[i].updated_at,
                    "git_commits_url": response[i].git_commits_url,
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(gitConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "UserGithub";
            tableau.submit();
        });
    });

})();

// API : https://api.github.com/users/{username}/repos