## Overview

Delivery Duo is a geographic information system built as a second-year course
project. It is designed to help delivery drivers explore a map, search for
intersections, and plan routes with multiple stops.

## Technical approach

- C++ and GTK3 on Debian 11 with the MATE desktop environment
- Raw geographic data is processed into a dynamic, interactive map
- TomTom data provides real-time traffic information where available
- Multithreading keeps map processing and route calculations responsive

The application combines Dijkstra's algorithm and A* for shortest paths. A
multi-start greedy method and simulated annealing are used for multi-stop route
planning.

## User experience

Users can import map data from `.bin` files, search for an intersection by two
street names, move around the map, and change the zoom level. Traffic jams are
shown directly on the map, while low zoom levels hide minor roads and points of
interest to keep the view readable.

## Presentation

The project presentation is available through the link above.
