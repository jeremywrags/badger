function sendRequests(request, numRequests) {
    if (request && numRequests) {
        request[".item"] = JSON.stringify(request[".item"]);
        if (request.action == "Purchase") {
            request[".order"] = JSON.stringify(request[".order"]);
            sendRequest(request);
        } else {
            numRequests = numRequests > 20 ? 20 : numRequests;
            for (var i = 0; i < numRequests; i++) {
                sendRequest(request);
            }
        }
    }
}

function sendRequest(request) {

    var egUrl = "";
    if (request.action == "View Item" || request.action == "Purchase" || request.action == "View Tag" || request.action == "View Category" || request.action == "Placed Bid") {
        egUrl = "https://mfg.evergage.com/twreceiver";
    } else if (request.action == "View Time") {
        egUrl = "https://mfg.evergage.com/pr";
    }

    if (egUrl && request) {
        $.ajax({
            url: egUrl,
            data: request,
            cache: false,
            success: function() {
                console.log("Sent Request");
            },
            async: false
        });
    }
}

function resetForm() {
    $("#ucp-form input:not('#ucp-form-submit-btn'), #ucp-form option").val("");
}

function validateInputs(inputs) {

    if (inputs.length < 1) {
        writeError("No data input");
        return false;
    }
    for (var i in inputs) {
        if (!inputs[i]) {
            writeError("Data input is blank");
            return false;
        }
    }

    return true;
}

function writeError(e) {
    $("#ucp-error").text(e);
}

function submitForm() {
    var isValid = true;
    $("#ucp-form .ucp-data-row").each(function(r, row) {
        var inputs = $(row).find("input, select");
        var inputValues = {};
        inputs.each(function(i, input) {
            inputValues[$(input).attr("name")] = $(input).val();
        });
        if (validateInputs(inputValues)) {
            // Common request parameters
            var ucpParams = {
                _ak:        $("#ucp-form #ucp-account").val(),
                _ds:        $("#ucp-form #ucp-dataset").val(),
                ".item":    { "_id": inputValues["ucp-item-id"], "type": $("#ucp-item-type").val() },
                action:     inputValues["ucp-action"],
            }

            // View Time parameters
            if (ucpParams["action"] == "View Time") {
                ucpParams[".top"] = "59999";
            }

            // Purchase parameters
            if (ucpParams["action"] == "Purchase") {
                ucpParams[".item"]["price"] = parseInt(inputValues["ucp-action-num"]);
                ucpParams[".order"] = {"lineItems": [{"item": ucpParams[".item"], "quantity": 1}]};
            }

            // Set anonymous vs. known
            var anon = $(".check_toggle .toggle").hasClass("off");
            if (anon) {
                ucpParams[".anonId"] = $("#ucp-user-id").val();
                ucpParams["_anon"] = "true";
            } else {
                ucpParams["userId"] = $("#ucp-user-id").val();
            }

            sendRequests(ucpParams, parseInt(inputValues["ucp-action-num"]));
        } else {
            isValid = false;
            return;
        }
    });

    return isValid;
}

function submitTagForm() {
    var isValid = true;
    $("#ucp-tag-form .ucp-data-row").each(function(r, row) {
        var inputs = $(row).find("input, select");
        var inputValues = {};
        inputs.each(function(i, input) {
            inputValues[$(input).attr("name")] = $(input).val();
        });
        if (validateInputs(inputValues)) {
            // Common request parameters
            var ucpParams = {
                _ak:        $("#ucp-tag-form #ucp-account").val(),
                _ds:        $("#ucp-tag-form #ucp-dataset").val(),
                ".item":    { "_id": inputValues["ucp-tag-id"], "type": "t", "tagType": $("#ucp-tag-type").val() },
                action:     "View Tag"
            }
            if ($("#ucp-tag-type option:selected").val() == "Category") {
                ucpParams[".item"]["type"] = "c";
                ucpParams.action = "View Category";
            }
            ucpParams[".anonId"] = "ucptestuser";
            ucpParams["_anon"] = "true";
            sendRequests(ucpParams, 1);
        } else {
            isValid = false;
            return;
        }
    });

    return isValid;
}

$(document).ready(function() {

    $(document).on("change", ".envdd", function(){                
        $(".envdd").val($(this).val())
    })

    $(document).on("blur", ".dsinput", function(){                    
        $(".dsinput").val($(this).val())
    })

    $("#ucp-form").submit(function() {
        if (!submitForm()) {
            return false;
        }
        return false;
    });
    $("#ucp-tag-form").submit(function() {
        if (!submitTagForm()) {
            return false;
        }
        return false;
    });

    $(".ucp-data-add").click(function(e) {
        var form = $(e.target).closest("form");
        var clone = form.find(".ucp-data-row").last().clone();
        clone.find("input, select").val("");
        form.find(".ucp-data-row").last().after(clone);
    });
});
