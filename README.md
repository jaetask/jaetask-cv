# A modern website in &lt;= 14Kb

Ok, I've been learning react and all that shizzle recently and am starting to question the recent rise in the size of JS code bases. With React coming in at 670Kb just for the "View" in MVC, and with some people including this into an angular application which itself is &gt; 500Kb, its all starting to look like insanity to me.
 
I've attended velocity conference which goes right into the heart of building web apps at the HTTP level, and read the excellent [High Performance Browser Networking](http://shop.oreilly.com/product/0636920028048.do) by [Ilya Grigorik](https://www.igvita.com) and can see that the push towards larger JS apps is failing on so many levels. I am trying to go in the other direction. I want to see what is possible, starting from the network level and then making decisions about not just what _can_ be done but what _should_ be done.
 
I am blatantly going to steal some of the concepts that [Patrick Hamann](https://twitter.com/patrickhamann) introduced when the Guardian switched to a &lt;1 second delivery on mobile, all of which are viewable in the [video](https://www.youtube.com/watch?v=dfweWyVScaI). Thank you Patrick for a very impressive talk and also for making me rethink the way we write and deliver applications.


## Goals

- Website in <= 14Kb
- Must be responsive, look good on mobile, tablet and desktop
    - please don't expect me to define 'good'.. I'm a terrible web designer :)
- May compile using babel, ES6 abilities etc
- HTTP 1.1 compatible
- Can load additional information via ajax but only in <= 14K max chunks
    - Chunks loaded via API, build failure if chunk >14Kb
- Must be a public github repo with full history available (no rebasing)
- Must only support modern browsers..
    - MS don't support IE6/7/8/9 so why should I?
- SVG images where possible, preferably inline.
- Must be fully unit tested
- Can use JS templating if required, i.e. responding to new pages via ajax JSON response but templates MUST be compiled in build process. Never send a templating engine to the browser.
- Must be built by CI, Jenkins, Travis etc
- Must be a deployable docker image
- Must be load balanced in at least two docker images
- May/May not use Grunt|Gulp
    
## Initial load
I am not sure how harsh I want to be on this, I would prefer the entire site to load in a single http request. That means inline SVG, JS and CSS. YES, inline! just lol to that but super super fast.

### Inline Pros
- JS code would always be loaded and available in a specific order
- No need for requireJS, e.g. I could still use modular approach and pass in a pubsub module into the modules to allow for inter module communication. 
- No separate http request
- No issue with cached JS, so no need for cache busting build system (unique filenames etc)

### Inline cons
- HTML page weight increased
- Much easier to break the > 14Kb build rule
- With a separate JS file my network ability is effectively doubled to 28Kb. 14Kb html and 14Kb JS. __But isn't that cheating?_     

# Every Kb counts
When you only have 14 of them, this becomes even more important. It is my personal belief that developers have forgotten the value of a Kb. Especially when transmitted over a bad 3G connection, 50Kb can kill a user experience.


# Broswer only
Please do not add comments on this project like _use react and go 'native'_ The internet gods will smite your breakfast..

 