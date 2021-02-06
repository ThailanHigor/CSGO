const steps = {
    init: function () {
        steps.firstStep();
        steps.secondStep();
        steps.thirdStep();
        steps.finalStep();
        steps.changeTeamSession();
    },
    firstStep: function () {

    },
    secondStep: function () {
        $(".radial-first-step").click(function () {
            let weapon_type_id = $(this).data("id");
            let team_name = sessionFunc.getSessionStorage("team");
            $('.category-selected-input').val(weapon_type_id);

            $.ajax({
                url: "/steps/getWeaponsByCategory",
                data: { weapon_type_id: weapon_type_id, team_name: team_name },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                console.log(data)
                if (data.flag_knives) {
                    buildContent.buildKnivesSelection(data);
                } else {
                    buildContent.buildWeaponRadialSelection(data);
                }


            });

        });
    },

    thirdStep: function () {
        $("body").delegate(".select-second-step", "click", (function () {
            let weaponSelectedSlug = $(this).data("slug");
            let weaponSelectedId = $(this).data("id");
            $('.weapon-selected-input').val($(this).data("filter"));

            $.ajax({
                url: "/steps/getSkinsFromWeapon",
                data: { weaponSelectedSlug: weaponSelectedSlug, weaponSelectedId: weaponSelectedId },
                type: 'GET',
                dataType: "json",
            }).done(function (data) {
                let skinsList = "";
                console.log(data)
                data.skins.map(function (skin) {
                    skinsList +=
                        `<div class="edgtf-sb-main-stream-item edgtf-item-space skin-item-third-step" data-id="${skin.id}" data-slug="${skin.slug}" data-filter="${skin.filter_term}">
                        <div class="edgtf-sb-main-stream-holder box-skin">
                            <img src="/static/images/skins${skin.image}" class="attachment-full"> 
                            <div class="edgtf-sb-text-holder box-holder">
                                <div class="edgtf-sb-channel">${skin.category}</div>
                                <h3 class="edgtf-sb-title">
                                    ${skin.name} </h3>
                            </div>
                        </div>
                    </div>`
                });

                skinsList += `<li class="close change-team"><a href="javascript:void(0)"  style="border: none;"> </a></li>`

                $(".section-third-step .section-third-step-itens").html(skinsList);

                $(".section-second-step").hide();
                $(".section-third-step").hide();
                $(".section-third-step").fadeIn(500);

                $(".message-step").hide();
                $(".message-step").text(data.message);
                $(".message-step").fadeIn(500);
            });

        }));
    },

    finalStep: function () {
        $("body").delegate(".skin-item-third-step", "click", (function () {
            let skinSelected = $(this).data("filter");
            let skinSelectedId = $(this).data("id");
            let weaponSelected = $(".weapon-selected-input").val();
            $('.skin-selected-input').val($(this).data("filter"));

            $.ajax({
                url: "/steps/getSkinInfo",
                data: { skinSelected: skinSelected, weaponSelected: weaponSelected, skinSelectedId: skinSelectedId },
                type: 'GET',
                dataType: "json"
            }).done(function (data) {
                let priceTable = "";

                data.prices_normals.map(function (data) {

                    priceTable +=
                        `<tr>
                            <th scope="row">${data.Float}</th>
                            <td><a href="${data.LinkBleik}" target="__blank">${data.PriceBleik}</a></td>
                            <td><a href="${data.LinkCSGOStore}" target="__blank">${data.PriceCSGOStore}</a></td>
                            <td><a href="${data.LinkNesha}" target="__blank">${data.PriceNesha}</a></td>
                            <td><a href="${data.LinkSteam}" target="__blank">${data.PriceSteam}</a></td>
                        </tr>`

                });

                priceTable += "<tr><td><br/><br/></td></tr>"

                data.price_stattrak.map(function (data) {

                    priceTable +=
                        `<tr>
                            <th scope="row">${data.Float}</th>
                            <td><a href="${data.LinkBleik}" target="__blank">${data.PriceBleik}</a></td>
                            <td><a href="${data.LinkCSGOStore}" target="__blank">${data.PriceCSGOStore}</a></td>
                            <td><a href="${data.LinkNesha}" target="__blank">${data.PriceNesha}</a></td>
                            <td><a href="${data.LinkSteam}" target="__blank">${data.PriceSteam}</a></td>
                        </tr>`

                });

                $(".section-final-step .table-comparation tbody").html(priceTable);

                $(".title-final-step").text(data.name);
                $(".image-final-step").attr("src", `/static/images/skins${data.image}`);

                $(".section-third-step").hide();
                $(".section-final-step").hide();
                $(".section-final-step").fadeIn(500);

                $(".message-step").hide();
                $(".message-step").text(data.message);
                $(".message-step").fadeIn(500);
            });

        }));
    },
    changeTeamSession: function () {
        $("body").delegate(".change-team", "click", function () {
            var value = $(this).attr("data-team");
            if (value === "TR") {
                $(".change-team").attr("data-team", "CT");
                sessionFunc.setSessionStorage("team", "CT");
                $(".change-team img").attr("src", `/static/images/sprites/LogoRadialCT.png`);
            } else if (value === "CT") {
                $(".change-team").attr("data-team", "TR");
                sessionFunc.setSessionStorage("team", "TR");
                $(".change-team img").attr("src", `/static/images/sprites/LogoRadialTR.png`);
            }

            //force button click to reload the radius menu
            let category_input = $(".category-selected-input").val();
            $(`.radial-first-step[data-id='${category_input}']`).click();
        })
    }
}

const buildContent = {
    init: function () {

    },
    buildWeaponRadialSelection: function (data) {
        let content = "";

        data.weapons.map((weapon, index) => {
            content +=
                `<li>
                    <a href="javascript:void(0)" class="weapon-${index + 1} select-second-step" data-id="${weapon.id}" data-slug="${weapon.slug}" data-filter="${weapon.filter_term}">
                        <img class="arma-radial" src="/static/images/armasRadial/${weapon.image}" alt="">
                        <span>${weapon.name}</span>
                        <div></div>
                    </a>
                </li>
                `
        });
        //necessary for don't broken css style
        if (data.weapons.length < 6) {
            content +=
                `<li>
                <a href="javascript:void(0)" class="weapon-6">

                    <div></div>
                </a>
            </li>
            `
        }

        //verify what is the last team select in Session
        let sessionTeam = sessionFunc.returnTeamSession()
        content += `  <li class="close change-team" data-team="${sessionTeam}"><img src="/static/images/sprites/LogoRadial${sessionTeam}.png"></li>`

        $(".section-second-step ul").html(content);

        $(".section-first-step").hide();
        $(".section-second-step").hide();
        $(".section-second-step").fadeIn(500);

        $(".message-step").hide();
        $(".message-step").text(data.message);
        $(".message-step").fadeIn(500);
    },
    buildKnivesSelection: function (data) {
        let content = "";

        data.weapons.map(weapon => {
            content +=
                `<div class="edgtf-team edgtf-item-space select-second-step" data-id="${weapon.id}" data-slug="${weapon.slug}" data-filter="${weapon.filter_term}">
                    <div class="edgtf-team-inner">
                        <div class="edgtf-team-categories"><span class="edgtf-team-category">Facas</span></div>
                        <div class="edgtf-team-image">
                            <img width="195" height="224"  src="/static/images/armasRadial/${weapon.image}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="${weapon.name}">
                        </div>
                        <div class="edgtf-team-info">
                            <h4 itemprop="name" class="edgtf-team-name entry-title">${weapon.name}</h4>
        
                        </div>
                    </div>
                </div>
                `
        });

        $(".section-second-step-knives .edgtf-outer-space").html(content);

        $(".section-first-step").hide();
        $(".section-second-step-knives").hide();
        $(".section-second-step-knives").fadeIn(500);

        $(".message-step").hide();
        $(".message-step").text(data.message);
        $(".message-step").fadeIn(500);
    }
}

const sessionFunc = {
    session_team: () => { return "team" },
    init: function () {
        if (!sessionFunc.getSessionStorage("team")) {
            sessionFunc.setSessionStorage("team", "CT");
        }
    },
    setSessionStorage: function (name, value) {
        sessionStorage.setItem(name, value);
    },
    getSessionStorage: function (name) {
        return sessionStorage.getItem(name);
    },
    returnTeamSession: function () {
        if (!sessionFunc.getSessionStorage("team")) {
            sessionFunc.setSessionStorage("team", "CT");
        }

        return sessionFunc.getSessionStorage("team")
    }
}

sessionFunc.init();
steps.init();