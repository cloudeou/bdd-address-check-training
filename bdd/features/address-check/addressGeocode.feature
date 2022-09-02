@-
@-
@addressGeocode
@DBbootstrap=retrieveAddress

Feature: Geocode user address and ip address

    Scenario: Gecode ip address
        Given address ip is @ip_address
        And address id is @id
        And address table is addresses
        When geocode ip address
        Then write location to db lat ip_lat lon ip_lon

    Scenario: Geoode text address
        Given address text is @address_text
        And address id is @id
        And address table is addresses
        When geocode address text
        Then write location to db lat address_lat lon address_lon

    #Scenario: Compair locations

    Scenario: Finish process
        When finish process for addresses

