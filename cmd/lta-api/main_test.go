package main

import "testing"

func TestDummy(t *testing.T) {
	expected := true
	actual := true

	if expected != actual {
		t.Errorf("ERROR!!!")
	}
}
