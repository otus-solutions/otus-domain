(function() {
    // To use default value run
    // npm run replace-env

    window.__env = window.__env || {};
    window.__env.apiUrl = "${API_URL}";

}());