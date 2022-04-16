#!/usr/bin/env bash

while getopts ":Mmp" Option ; do
	case ${Option} in
    	M ) major=true;;
        m ) minor=true;;
        p ) patch=true;;
    esac
done

shift $((${OPTIND} -1))

version=$1


a=( ${version//./ } )

if [ ${#a[@]} -ne 3 ] ; then
	echo "usage: $(basename $0) [-Mmp] major.minor.patch"
    exit 1
fi

if [ ! -z ${major} ] ; then
	((a[0]++))
    a[1]=0
    a[2]=0
fi

if [ ! -z ${minor} ] ; then
	((a[1]++))
    a[2]=0
fi

if [ ! -z ${patch} ] ; then
	((a[2]++))
fi

echo "${a[0]}.${a[1]}.${a[2]}"
