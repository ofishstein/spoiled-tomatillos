## Backend Schema
The backend for Rotten Tomatillos is broken into three types of information.
**User**, **Content**, and **Supporting** information. The following sections
describe and elaborate on the UML diagram below.

![Backend UML Diagram][diagram]

[diagram]: ./Backend.png

### User
The User information is composed of account information and a number
of links to **Content** and **Support** information. A user is identified
primarily by their `userId`. This id is also tracked in other users'
`follower` and `following` lists, as well as by any `UserContent` information.

### Content
The content on the site is all derived from an abstract `Content` class which
contains only an optional parent field. This field is useful in linking reviews
to movies or comments to reviews for instance, but is not required by the Movie
information because movies are generally the root of a parent child relationship.

The `Content` class is intended to make adding new types of content to the platform
as pain-free as possible. `UserContent` contains more information that a User of the site
might generate (Comments or Reviews for example). Movies have reviews, whereas a review
might have a comment, and a playlist might also have a comment.

### Support
The supporting information is everything else in the UML. These classes are small
and are intended to contain specific information that the more central classes might
want to use without loss of generality. For example, the Rating interface might just
as well be a number, however, if we want to integrate new ratings from external sources
in the future, this type of rating would have to change. Using the interface allows for
generality and flexibility in that scenario.
