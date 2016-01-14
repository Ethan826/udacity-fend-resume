Udacity Resume project
======================

To run, clone the repository and launch `index.html` in your browser.

Notes
-----

-   The JavaScript files are transpiled from TypeScript. The original
    TypeScript files are in the repository but are not used by the
    browser.
-   I implemented most of the functionality in a TypeScript / ES6 class
    rather than in the so-called JSON object.[^1] I did so because it
    makes more sense to encapsulate the logic in a reusable class rather
    than reimplementing it in every resume “JSON” object. My
    implementation should meet the letter of the rubric. See also
    [here](https://discussions.udacity.com/t/encapsulation-question/43239/3).
-   The rubric does not actually require compliance with the styleguide.
    I departed from the single- versus double-quotes convention because
    you have to fight the TypeScript compiler to use the Udacity style.
-   I implemented the extra-credit interactivity in a slightly silly
    way: click on my name three times within a second for a warning, and
    do it again to make the page self-destruct (and do a little
    surprise).
-   I customized the CSS. It is not particularly beautiful, but it is
    completely different than the original.
-   The design of the “JSON” object is a bit funky: you don’t pass in a
    URL for jobs or for projects. The rubric is very clear that the
    “JSON” object must follow the specifications exactly. As a result, I
    wrote a shim function that fixes URLs in an ad hoc fashion. This is
    a bad design, but the only way I can see to do it with the
    limitation on the “JSON” object.
-   I refactored the hiding functionality into the `resumeBuilder` file,
    and have left reimplementing it as a TODO. The characteristics that
    code relies on have changed in my implementation. The rubric does
    not require this functionality.
-   I have not implemented the international name functionality, as it
    is not required in the rubric.

[^1]: It’s not actually JSON. See
    [here](http://stackoverflow.com/questions/2001449/is-it-valid-to-define-functions-in-json-results).
