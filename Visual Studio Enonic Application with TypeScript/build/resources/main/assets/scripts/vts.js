VTIL = {} || VTIL;
VTIL.ajax = function (opts) {
    $.ajax(opts);
};


VTIL.Hovedmeny = function (el) {
    this.el = el;
    this.nav_el = el.children("ul");
    this.toggle_el = el.find(".toggle");
};

VTIL.Hovedmeny.prototype.init = function () {
    this.events();
    this.toggle_el.appendTo(this.el);
    this.nav_el.wrap('<div class="nav-main-wrap" />');
    this.wrap_el = this.el.find(".nav-main-wrap");
    this.nav_el.show();
    this.sett_hoyde();
    this.lukk_meny();
};

VTIL.Hovedmeny.prototype.sett_hoyde = function () {
    this.hoyde = this.nav_el.outerHeight();
};

VTIL.Hovedmeny.prototype.rund_opp_hoyde = function () {
    var rute_storrelse = 32;
    var hoyde_temp = this.hoyde;
    var multiplikator = hoyde_temp / rute_storrelse;
    multiplikator = Math.ceil(multiplikator);
    var hoyde_opprundet = (rute_storrelse * multiplikator) - 1; // Fjerner 1px til kantlinje
    return hoyde_opprundet;
};

VTIL.Hovedmeny.prototype.events = function () {
    this.toggle_el.on("click", this, this.toggle_meny);
};

VTIL.Hovedmeny.prototype.lukk_meny = function () {
    this.wrap_el.css({
        "height": 0,
        "margin-bottom": 0
    });
    this.vises = false;
};

VTIL.Hovedmeny.prototype.aapne_meny = function () {
    var hoyde = this.rund_opp_hoyde();
    this.wrap_el.css({
        "height": hoyde,
        "margin-bottom": "1px"
    });
    this.vises = true;
};

VTIL.Hovedmeny.prototype.toggle_meny = function (event) {
    event.preventDefault();
    var meny = event.data;
    if (meny.vises) {
        meny.lukk_meny();
        meny.toggle_el.text("Vis meny").toggleClass("open");;
    } else {
        meny.aapne_meny();
        meny.toggle_el.text("Lukk meny").toggleClass("open");
    }

    meny.el.toggleClass("aapen");

}; VTIL.init = (function () {

    var init = function () {

        VTIL.tipsEnVenn.init("#tips-paa-epost");

        if ($("#nav-main-menu-mobile").length > 0) {
            var meny = new VTIL.Hovedmeny($(".nav-main-container"));
            meny.init();
        }

    };

    $(document).ready(init);

})();/* VTIL.lightbox = (function() {
	
	var self = {};
	
	self.init = function() {
		
	};
	
	return self;
	
})(); */VTIL.tipsEnVenn = (function () {

    var self = {}, formContainer, el, selector;

    var hideLink = '<a href="#" class="hide-form-container">Lukk vindu</a>';

    self.fetchForm = function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        VTIL.ajax({
            type: "GET",
            url: url,
            success: function (response) {
                $(VTIL.tipsEnVenn).trigger("tipsEnVenn:formFetched", response)
            },
            error: function () {
                displayError("Beklager, tips på e-post er for tida ute av drift");
            }
        })
    };

    var makeContainer = function () {
        var containerId = "emailtip-form-container";
        el.parent().append('<div id="' + containerId + '" />');
        formContainer = $("#" + containerId);
    };

    var displayForm = function (event, form) {
        formContainer.html(form);
        formContainer.fadeIn(300);
        addHideLink("form");
        var formObj = formContainer.find("form");
        $(VTIL.tipsEnVenn).trigger("tipsEnVenn:formDisplayed", formObj);
    };

    var addHideLink = function (where) {
        switch (where) {
            case "form":
                $(hideLink).appendTo(formContainer.find("form"));
                break;
            case "message":
                $(hideLink).appendTo(formContainer);
                break;
        }
    }

    var hideFormContainer = function (event) {
        event.preventDefault();
        formContainer.fadeOut(150, function () {
            $(this).children().remove();
        })
    }

    var validateEmail = function (val) {
        if (!val) {
            return false;
        }

        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(val);
    };

    var validateString = function (val) {
        if (val != "" && $.trim(val) != "") {
            return true;
        } else {
            return false;
        }
    };

    var removeError = function () {
        formContainer.find(".error").remove();
    };

    var displayError = function (msg) {
        removeError();
        $('<div class="error"><p>' + msg + '</p></div>').prependTo(formContainer);
    }

    var validateForm = function (event) {

        event.preventDefault();
        var form = $(this);

        var senderEmail = form.find("#sender").val();
        var receiverEmail = form.find("#mottaker").val();
        var senderName = form.find("#sendernavn").val();
        var receiverName = form.find("#mottakernavn").val();

        if (validateEmail(senderEmail) && validateEmail(receiverEmail) && validateString(senderName) && validateString(receiverName)) {
            self.submitForm(form);
        } else {
            displayError("Det har skjedd ein feil, sjå om du har fylt ut felta riktig");
        }

    };

    self.submitForm = function (form) {
        var data = form.serialize();
        var url = form.attr("action");
        VTIL.ajax({
            type: "POST",
            data: data,
            url: url,
            success: function (response) {
                formContainer.fadeOut(150, function () {
                    formContainer.html(response);
                    addHideLink("message");
                    formContainer.fadeIn(150);
                })
            },
            error: function () {
                displayError("Beklager, det oppstod ein feil.");
            }
        });
    };

    self.activateForm = function (event, form) {
        $(form).bind("submit", validateForm);
    };

    var listenToEvents = function () {
        el.bind("click", self.fetchForm);
        $(VTIL.tipsEnVenn).bind("tipsEnVenn:formFetched", displayForm);
        $(VTIL.tipsEnVenn).bind("tipsEnVenn:formDisplayed", self.activateForm);
        $(".hide-form-container").live("click", hideFormContainer);
    }

    self.init = function (selector) {
        el = $(selector);
        makeContainer();
        listenToEvents();
    };

    self.die = function () {
        $(VTIL.tipsEnVenn).unbind();
    }

    return self;

})();